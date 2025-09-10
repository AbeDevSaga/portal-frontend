"use client"
import { useRouter } from "next/navigation";

export default function Page() {
  const route = useRouter();
  route.push("/civil-registration/marriage/new");
}
