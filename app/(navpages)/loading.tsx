import { Skeleton } from "@/components/ui/skeleton"
import ClipLoader from "react-spinners/ClipLoader";
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div><Skeleton/> <ClipLoader /></div>
  }