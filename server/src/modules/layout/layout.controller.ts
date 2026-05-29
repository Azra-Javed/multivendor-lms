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
          banner: {
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          },
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
          }),
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
          }),
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
  },
);

//@desc: edit layout
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

        let newImage = bannerData.banner.image;

        // If user uploaded a NEW image (NOT https URL)
        if (!image.startsWith("https")) {
          // delete old image
          await cloudinary.v2.uploader.destroy(
            bannerData.banner.image.public_id,
          );

          // upload new one
          const uploaded = await cloudinary.v2.uploader.upload(image, {
            folder: "layout",
          });

          newImage = {
            public_id: uploaded.public_id,
            url: uploaded.secure_url,
          };
        }

        await LayoutModel.findByIdAndUpdate(
          bannerData._id,
          {
            type: "Banner",
            banner: {
              image: newImage,
              title,
              subTitle,
            },
          },
          { new: true },
        );

        return res.status(200).json({
          success: true,
          message: "Banner updated successfully",
        });
      }

      // ---------- FAQ ----------
      else if (type === "FAQ") {
        const { faq } = req.body;
        const faqData = await LayoutModel.findOne({ type: "FAQ" });

        if (!faqData) {
          return next(new ErrorHandler("FAQ layout not found", 404));
        }

        const faqItems = faq.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }));

        await LayoutModel.findByIdAndUpdate(
          faqData._id,
          { type: "FAQ", faq: faqItems },
          { new: true },
        );

        return res.status(200).json({
          success: true,
          message: "FAQ updated successfully",
        });
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

        const categoryItems = categories.map((item: any) => ({
          title: item.title,
        }));

        await LayoutModel.findByIdAndUpdate(
          categoriesData._id,
          { type: "Categories", categories: categoryItems },
          { new: true },
        );

        return res.status(200).json({
          success: true,
          message: "Categories updated successfully",
        });
      }

      return next(new ErrorHandler("Invalid layout type", 400));
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

//@desc: get layout by type
//@route:GET/api/v1/get-layout/:type
export const getLayoutBYType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;
      const layout = await LayoutModel.findOne({ type });
      console.log("layout", layout);
      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
