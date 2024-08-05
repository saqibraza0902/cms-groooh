import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

interface IProp {
  params: {
    slug: string;
  };
}
export const GET = async (req: Request, { params }: IProp) => {
  const { slug } = params;
  console.log(slug);
  try {
    const colRef = doc(db, "Collectibles", slug);
    const snapshot = await getDoc(colRef);
    const data = { id: snapshot.id, ...snapshot.data() };
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err }), { status: 500 });
  }
};
export const revalidate = 0;
