import { db } from "@/utils/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const colRef = collection(db, "Blogs");
    const snapshot = await getDocs(query(colRef, orderBy("createdAt", "asc")));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const newdata = data.filter((el: any) => el.isArchived === false);
    return new NextResponse(JSON.stringify(newdata));
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err }));
  }
};
export const dynamic = "force-dynamic";
