import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import LayoutModel from "./layout.model.js";
import cloudinary from "cloudinary";

//@desc: create layout
//@route: POST /api/v1/layout/create-layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const banner = {
          type: "Banner",
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.create(banner);
      }

      //FAQ
      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.create({ type: "FAQ", faq: faqItems });
      }

      // categories
      if (type == "Categories") {
        const { categories } = req.body;
        const categoryItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.create({
          type: "Categories",
          categories: categoryItems,
        });
      }

      res.status(201).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: create layout
//@route: PATCH /api/v1/layout/edit-layout
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      // ---------- Banner ----------
      if (type === "Banner") {
        const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
        if (!bannerData) {
          return next(new ErrorHandler("Banner layout not found", 404));
        }

        const { image, title, subTitle } = req.body;

        // Delete old image from Cloudinary
        if (bannerData?.image?.public_id) {
          await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
        }

        // Upload new image
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        // Update DB
        await LayoutModel.findByIdAndUpdate(
          bannerData._id,
          {
            type: "Banner",
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          },
          { new: true }
        );
      }

      // ---------- FAQ ----------
      else if (type === "FAQ") {
        const { faq } = req.body;
        const faqData = await LayoutModel.findOne({ type: "FAQ" });

        if (!faqData) {
          return next(new ErrorHandler("FAQ layout not found", 404));
        }

        const faqItems = await Promise.all(
          faq.map(async (item: any) => ({
            question: item.question,
            answer: item.answer,
          }))
        );

        await LayoutModel.findByIdAndUpdate(
          faqData._id,
          { type: "FAQ", faq: faqItems },
          { new: true }
        );
      }

      // ---------- Categories ----------
      else if (type === "Categories") {
        const { categories } = req.body;
        const categoriesData = await LayoutModel.findOne({
          type: "Categories",
        });

        if (!categoriesData) {
          return next(new ErrorHandler("Categories layout not found", 404));
        }

        const categoryItems = await Promise.all(
          categories.map(async (item: any) => ({
            title: item.title,
          }))
        );

        await LayoutModel.findByIdAndUpdate(
          categoriesData._id,
          { type: "Categories", categories: categoryItems },
          { new: true }
        );
      }

      res.status(200).json({
        success: true,
        message: "Layout updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: get layout by type
//@route:GET/api/v1/layout/get-layout
export const getLayoutBYType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const layout = await LayoutModel.findOne({ type });
      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
