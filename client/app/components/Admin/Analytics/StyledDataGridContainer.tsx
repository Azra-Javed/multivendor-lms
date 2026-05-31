"use client";

import { Box } from "@mui/material";
import { useTheme } from "next-themes";

const StyledDataGridContainer = ({
  children,
  height = "85vh",
  mt = "40px",
}: {
  children: React.ReactNode;
  height?: string;
  mt?: string;
}) => {
  const { theme, resolvedTheme } = useTheme();

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <Box m="20px">
      <Box
        m="0"
        height={height}
        overflow="hidden"
        sx={{
          boxShadow: isDark ? "none" : "0 8px 24px rgba(0,0,0,0.08)",
          border: isDark ? "none" : "1px solid #e2e8f0",

          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
            fontFamily: "Poppins, sans-serif",
          },

          "& .MuiDataGrid-row": {
            color: isDark ? "#e2e8f0" : "#1e293b",
            borderBottom: isDark
              ? "1px solid rgba(255,255,255,0.06) !important"
              : "1px solid #f1f5f9 !important",
            "&:hover": {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.04) !important"
                : "#f8fafc !important",
            },
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "none !important",
            fontSize: "13px",
          },

          "& .MuiDataGrid-columnHeaders": {
            color:
              theme === "dark" ? "#e2e8f0 !important" : "#0f172a !important",
            borderBottom: "none",
            backgroundColor:
              theme === "dark"
                ? "rgba(20,184,166,0.12) !important"
                : "#f8fafc !important",
            minHeight: "48px !important",
            maxHeight: "48px !important",
          },

          "& .MuiDataGrid-columnHeader": {
            backgroundColor:
              theme === "dark"
                ? "rgba(20,184,166,0.1) !important"
                : "#f1f5f9 !important",
            "&:focus": { outline: "none" },
            "&:focus-within": { outline: "none" },
          },

          "& .MuiDataGrid-columnHeadersInner": {
            backgroundColor: isDark
              ? "#1e293b !important"
              : "#f8fafc !important",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: isDark ? "#e2e8f0" : "#0f172a",
          },

          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
          },
          "& .MuiDataGrid-overlay": {
            backgroundColor: isDark
              ? "#0f172a !important"
              : "#ffffff !important",
            color: isDark ? "#e2e8f0 !important" : "#1e293b !important",
          },

          "& .MuiDataGrid-overlayWrapper": {
            backgroundColor: isDark
              ? "#0f172a !important"
              : "#ffffff !important",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: isDark
              ? "#1e293b !important"
              : "#f8fafc !important",
            borderTop: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid #e2e8f0",
            color: isDark ? "#94a3b8" : "#64748b",
          },

          "& .MuiTablePagination-root": {
            color: isDark ? "#94a3b8" : "#64748b",
          },

          "& .MuiCheckbox-root": {
            color: "#14b8a6 !important",
          },

          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: isDark
              ? "rgba(20, 184, 166, 0.10) !important"
              : "rgba(20, 184, 166, 0.08) !important",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default StyledDataGridContainer;
