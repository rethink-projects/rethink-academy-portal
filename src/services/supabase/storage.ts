import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { supabaseClient } from "./client";

const bucket = "rethink-academy-storage";
export const uploadContractByName = async (avatarFile: File, name: string) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .upload(`contracts/${name}/contract`, avatarFile, {
      upsert: true,
    });
  return { data, error };
};

// const formatedName = name.replace(
//   /[~`!@#$%^&*()+={}\\[\];:\\'\\"<>.,\\/\\\\?-_]/g,
//   ""
// );

// let file: File;

export function useStorage() {
  const { user } = useAuth();
  const [url, setUrl] = useState<string | null>();
  const { notify } = useNotification();

  const initStorage = async () => {
    if (user) {
      const { data } = await supabaseClient.storage.getBucket(user.email);
      if (!data?.id) {
        await createBucket();
      }
    }
  };

  const uploadFile = async (path: string, file: File) => {
    const { data, error } = await supabaseClient.storage
      .from(user.email)
      .upload(path, file, {
        upsert: true,
      });
    if (error) {
      return notify({
        type: "error",
        title: "Erro ao fazer upload desse arquivo!",
      });
    }
    console.log({ data });

    return notify({
      type: "success",
      title: `Upload feito com sucesso`,
    });
  };

  const generateUrlToDownload = async (path: string) => {
    const { data, error } = await supabaseClient.storage
      .from(user.email)
      .createSignedUrl(path, 5000);
    if (error) {
      return notify({
        type: "error",
        title: "Erro ao fazer upload desse arquivo!",
      });
    }
    setUrl(data?.signedURL!);
    return notify({
      type: "success",
      title: `Url gerada com sucesso`,
    });
  };

  const createBucket = async () => {
    const { data, error } = await supabaseClient.storage.createBucket(
      user.email
    );
    if (error) {
      console.log({ error });

      notify({
        type: "error",
        title: error.message,
      });
      return;
    }
    return notify({
      type: "success",
      title: `Bucket ${data} criado com sucesso`,
    });
  };

  return {
    createBucket,
    initStorage,
    uploadFile,
    generateUrlToDownload,
    url,
  };
}
