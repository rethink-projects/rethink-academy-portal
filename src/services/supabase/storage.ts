import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { getOneBucket, upsertBucket } from "../backend/BucketService";
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

  const uploadFile = async (fileName: string, file: File, title: string) => {
    const { data, error } = await supabaseClient.storage
      .from(user.email)
      .upload(title + "/" + fileName, file, {
        upsert: true,
      });
    if (error) {
      return notify({
        type: "error",
        title: "Erro ao fazer upload desse arquivo!",
      });
    }
    if (title) {
      let helper: any = data!.Key.split("/");
      helper.shift();
      helper = helper.join("/");

      const bucket = await upsertBucket(helper, title, user.email);

      notify({
        type: "success",
        title: `Upload feito com sucesso`,
      });
      //console.log({ bucket });
      return bucket;
    }
  };

  const generateUrlToDownload = async (title: string) => {
    const bucket = await getOneBucket(
      window.btoa(title),
      //Buffer.from(title).toString("base64"),
      user.email
    );
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    const { data, error } = await supabaseClient.storage
      .from(user.email)
      .createSignedUrl(bucket.url, 5000);
    if (error) {
      return notify({
        type: "error",
        title: "Erro ao fazer upload desse arquivo!",
      });
    }
    setUrl(data?.signedURL!);
    window.open(data?.signedURL, "_blank");
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
