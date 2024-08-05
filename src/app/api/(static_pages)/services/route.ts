import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const ref = doc(db, "Pages", "SERVICES");
    const snapshot = await getDoc(ref);
    const data: any = { id: snapshot.id, ...snapshot.data() };
    const allServices = [
      ...(Array.isArray(data.SERVICE_1?.services)
        ? data.SERVICE_1.services
        : []),
      ...(Array.isArray(data.SERVICE_2?.services)
        ? data.SERVICE_2.services
        : []),
      ...(Array.isArray(data.SERVICE_3?.services)
        ? data.SERVICE_3.services
        : []),
    ];
    return new NextResponse(JSON.stringify(allServices), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: err }));
  }
};
