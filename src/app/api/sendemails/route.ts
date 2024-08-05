import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async () => {
  try {
    const ref = collection(db, "Subscribe");
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log(data);
    const subject = "This is only for testing purpose";
    const emails = data.map((el: any, i) => {
      return el.email;
    });

    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_USER,
        pass: process.env.NEXT_PUBLIC_APP_PASS,
      },
    });
    console.log(emails);

    const mailOption = {
      from: `"ABC" <${process.env.NEXT_PUBLIC_USER}>`,
      to: process.env.NEXT_PUBLIC_USER, // Or your own email address
      bcc: emails,
      service: "Gmail",
      host: "smtp.gmail.com",
      subject,
      port: 465,
      secure: true,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <body>
        <p>"HEllo"</p>
        <p>How are you</p>
        <div>That's poti</div>
        <p>Nothing new</p>
        </body>

        </html>

        `,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
};
