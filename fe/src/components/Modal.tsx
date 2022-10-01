import React from "react";
import { Modal as BaseModal, ModalProps } from "antd";
import { t } from "../i18n";

export const Modal: React.FC<ModalProps> = ({ ...props }) => <BaseModal 
okText={t("ok")} 
cancelText={t("cancel")} 
{...props} />;
