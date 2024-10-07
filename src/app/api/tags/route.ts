import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const colRef = collection(db, "Tags");
    const snapshot = await getDocs(colRef);
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
export const dynamic = "force-dynamic";
