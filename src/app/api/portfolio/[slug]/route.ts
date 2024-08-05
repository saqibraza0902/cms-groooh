import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const ref = collection(db, "Portfolio");
    const q = query(ref, where("slug", "==", params.slug));
    const snap = await getDocs(q);
    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newdata = {
      ...data[0],
    };
    return new NextResponse(JSON.stringify(newdata));
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: err }));
  }
};
