import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { parse } from "url";

export const GET = async (req: any, res: NextApiResponse) => {
  try {
    const { query: queryParams } = parse(req.url, true);
    const { mytype } = queryParams;
    const ref = collection(db, "Collectibles");
    const snapshots = await getDocs(ref);
    const data = snapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const subtypes = data.map((el: any) => el.type);
    if (mytype !== "") {
      const colRef = query(ref, where("type", "==", mytype));
      const snapshot = await getDocs(colRef);
      const newdata = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return new NextResponse(JSON.stringify({ data: newdata, subtypes }));
    }

    return new NextResponse(JSON.stringify({ data: data, subtypes }));
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }));
  }
};
