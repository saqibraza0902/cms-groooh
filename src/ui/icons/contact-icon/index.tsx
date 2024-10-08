import Image from "next/image";
import React from "react";

const ContactIcon = () => {
  const CONTACT_ICON =
    "https://firebasestorage.googleapis.com/v0/b/groooh-com.appspot.com/o/navbar-icons%2FChat-Dot.svg?alt=media&token=7f7ae362-84ff-4e89-9fab-19b45ce9744d";
  return <Image alt="" src={CONTACT_ICON} height={30} width={30} />;
};

export default ContactIcon;
