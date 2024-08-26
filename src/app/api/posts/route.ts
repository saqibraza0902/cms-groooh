import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const colRef = collection(db, "Blogs");
    const snapshot = await getDocs(
      query(colRef, where("isArchived", "==", false))
    );
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new NextResponse(JSON.stringify(data));
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err }));
  }
};
// export const dynamic = "force-dynamic";
