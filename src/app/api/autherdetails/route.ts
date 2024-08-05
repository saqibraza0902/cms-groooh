import { db } from "@/utils/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";
export const GET = async (req: any, res: any) => {
  // const { query: queryParams } = parse(req.url, true);
  // const { id } = queryParams;
  try {
    // const docRef = doc(db, "Authers", id as string);
    // const docSnap = await getDoc(docRef);
    // return new NextResponse(JSON.stringify(docSnap.data()));
    return new NextResponse(JSON.stringify("HEllo"));
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }));
  }
};
