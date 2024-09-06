import { db } from "@/utils/firebase";
import { orderBy, query } from "firebase/firestore";
import { collection, getDocs, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const colRef = collection(db, "Portfolio");
    const snapshot = await getDocs(query(colRef, orderBy("createdAt", "asc")));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const newdata = data.filter((el: any) => el.isArchived === false);
    return new NextResponse(JSON.stringify(newdata));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
export const dynamic = "force-dynamic";
