import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

export const primaryNavItems = [
  {
    id: 1,
    name: "ড্যাশবোর্ড",
    icon: <DashboardOutlinedIcon sx={{ color: "#607D8B" }} />,
    pathName: "/dashboard",
  },
  {
    id: 2,
    name: "ইস্যু",
    icon: <BallotOutlinedIcon sx={{ color: "#607D8B" }} />,
    pathName: "/issues-news",
  },
  {
    id: 3,
    name: "প্রোফাইল",
    icon: <FolderSharedOutlinedIcon sx={{ color: "#607D8B" }} />,
    pathName: "/profile-list",
  },
  {
    id: 4,
    name: "অনুসন্ধান",
    icon: <ContentPasteSearchIcon sx={{ color: "#607D8B" }} />,
    pathName: "/search",
  },
  {
    id: 5,
    name: "চ্যাটজিপিটি",
    icon: <ForumOutlinedIcon sx={{ color: "#607D8B" }} />,
    pathName: "/chatgpt",
  },
];

export const secondaryNavItems = [
  {
    id: 4,
    name: "ইস্যু ক্যাটাগরি",
    icon: <DnsOutlinedIcon sx={{ color: "#607D8B" }} />,
    pathName: "/issues-event-category",
  },
  {
    id: 6,
    name: "থ্রেট ক্যাটাগরি",
    icon: <WarningAmberOutlinedIcon sx={{ color: "#607D8B" }} />,
    pathName: "/threat-category",
  },
  {
    id: 7,
    name: "মিনিস্ট্রি",
    icon: <AccountBalanceOutlinedIcon sx={{ color: "#607D8B" }} />,
    pathName: "/ministry",
  },
  {
    id: 8,
    name: "ট্যাগ",
    icon: <LabelOutlinedIcon sx={{ color: "#607D8B", rotate: "180deg" }} />,
    pathName: "/tag",
  },
];
