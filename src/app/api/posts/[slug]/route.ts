import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
interface IProp {
  params: {
    slug: string;
  };
}

export const GET = async (req: Request, { params }: IProp) => {
  try {
    const { slug } = params;
    console.log(slug);
    const usersRef = collection(db, "Blogs");
    const q = query(usersRef, where("slug", "==", slug));
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
    return new NextResponse(JSON.stringify({ message: err }), { status: 500 });
  }
};
