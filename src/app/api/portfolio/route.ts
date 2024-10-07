import { db } from "@/utils/firebase";
import { orderBy, query } from "firebase/firestore";
import { collection, getDocs, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { parse } from "url";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("t");
    const t = type == undefined ? "" : type;

    const colRef = collection(db, "Portfolio");
    const snapshot = await getDocs(query(colRef, orderBy("createdAt", "asc")));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const newdata = data.filter((el: any) => el.isArchived === false);
    const filteredData =
      typeof t === "string" && t !== ""
        ? newdata.filter((el: any) =>
            el.tags?.some((tag: string) => tag.includes(t))
          )
        : newdata;

    return new NextResponse(JSON.stringify(filteredData));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
export const dynamic = "force-dynamic";
