import { db } from "@/utils/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: any, res: NextApiResponse) => {
  try {
    const array = await req.json();
    const usersRef = collection(db, "Portfolio");
    const q = query(
      usersRef,
      where("tags", "array-contains-any", array),
      limit(3)
    );
    const snap = await getDocs(q);
    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }));
  }
};
