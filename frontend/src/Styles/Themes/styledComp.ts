import { Badge, BadgeProps, Box, styled } from "@mui/material";

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 10,
    top: 45,
    border: `1px solid ${theme.palette.background.paper}`,
  },
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));
