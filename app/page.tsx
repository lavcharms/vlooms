import ComingSoon from "../components/ComingSoon";
import VloomsWebsite from "../components/VloomsWebsite";

const COMING_SOON = true;

export default function Page() {
  return COMING_SOON ? <ComingSoon /> : <VloomsWebsite />;
}