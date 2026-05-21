// components/StyledDataGridContainer.tsx
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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Box m="40px">
      <Box
        m="40px 0 0 0"
        height="85vh"
        overflow="hidden"
        sx={{
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
          // ── header: slate not white ──
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: isDark
              ? "#1e293b !important"
              : "#f8fafc !important",
            color: isDark ? "#94a3b8 !important" : "#0f172a !important",
            borderBottom: isDark
              ? "1px solid rgba(255,255,255,0.08) !important"
              : "2px solid #e2e8f0 !important",
            minHeight: "48px !important",
            maxHeight: "48px !important",
            boxShadow: isDark ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: isDark ? "#94a3b8" : "#0f172a",
          },
          "& .MuiDataGrid-columnHeader": {
            "&:focus, &:focus-within": { outline: "none" },
          },

          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
          },
          // ── footer: slate not white ──
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: isDark
              ? "#1e293b !important"
              : "#f8fafc !important",
            borderTop: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid #e2e8f0",
            color: isDark ? "#94a3b8" : "#64748b",
            minHeight: "48px",
          },
          "& .MuiTablePagination-root": {
            color: isDark ? "#94a3b8" : "#64748b",
            fontSize: "12px",
          },
          "& .MuiTablePagination-actions button": {
            color: isDark ? "#94a3b8" : "#64748b",
          },
          "& .MuiDataGrid-sortIcon": {
            color: isDark ? "#94a3b8" : "#64748b",
          },
          "& .MuiCheckbox-root": {
            color: "#14b8a6 !important",
          },
          "& .MuiDataGrid-toolbarContainer": {
            padding: "8px 8px 4px",
            borderBottom: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid #e2e8f0",
            backgroundColor: isDark ? "#1e293b" : "#f8fafc",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: isDark ? "#94a3b8 !important" : "#64748b !important",
            fontSize: "12px",
            textTransform: "capitalize",
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility: "visible",
            color: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
          },
          "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            color: isDark ? "#94a3b8" : "#64748b",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: isDark
              ? "rgba(20, 184, 166, 0.10) !important"
              : "rgba(20, 184, 166, 0.08) !important",
            color: isDark ? "#e2e8f0" : "#1e293b",
          },

          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: isDark
              ? "rgba(20, 184, 166, 0.14) !important"
              : "rgba(20, 184, 166, 0.12) !important",
            color: isDark ? "#e2e8f0" : "#1e293b",
          },

          "& .MuiDataGrid-row.Mui-selected.Mui-hovered": {
            backgroundColor: isDark
              ? "rgba(20, 184, 166, 0.12) !important"
              : "rgba(20, 184, 166, 0.10) !important",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default StyledDataGridContainer;
