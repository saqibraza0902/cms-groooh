import CommonLayout from "@/layout";
import ContactLayout from "@/layout/Contact";
import { contact_details } from "@/utils/function";
import { IContact } from "@/utils/types";
import React from "react";

const Contact = async () => {
  const contact_detail: IContact = await contact_details();
  return (
    <CommonLayout>
      <ContactLayout contact={contact_detail} />
    </CommonLayout>
  );
};

export default Contact;
