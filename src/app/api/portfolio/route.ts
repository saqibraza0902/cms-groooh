import { db } from "@/utils/firebase";
import { query } from "firebase/firestore";
import { collection, getDocs, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const colRef = collection(db, "Portfolio");
    const snapshot = await getDocs(
      query(colRef, where("isArchived", "==", false))
    );
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new NextResponse(JSON.stringify(data));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
export const revalidate = 0;
