import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const id = "HOME";
    const ref = doc(db, "Pages", id);
    const snapshot = await getDoc(ref);
    const data = { id: snapshot.id, ...snapshot.data() };
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err }));
  }
};
