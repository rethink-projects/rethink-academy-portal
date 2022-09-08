import styles from "./ContractScreen.module.css";

import { useEffect, useState } from "react";

//context
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

//components
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NewDocumentCard from "./components/NewDocumentCard/NewDocumentCard";
import Dropdown from "./components/Dropdown/StatusDropdown";
import StatusTag from "./components/StatusTag/StatusTag";
import ButtonWithIcon from "../../components/ButtonWithIcon/ButtonWithIcon";
import DocumentCard, { fileType } from "./components/DocumentCard/DocumentCard";

//libs
import {
  CorporateFare,
  Schedule,
  BusinessCenter,
  DirectionsBus,
  LaptopMac,
  InfoOutlined,
  ModeEditOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

export type infoType = {
  email: string;
  college: string;
  semester: string;
  workTime: string;
  transportationVoucher: string;
  providedEquipment: string;
  status: string;
};

const ContractScreen = () => {
  const [contractStatus, setContractStatus] = useState("");
  const [isShown, setIsShown] = useState(true);
  const { notify } = useNotification();
  const [info, setInfo] = useState<infoType>();
  const { user } = useAuth();
  const editIcon = <ModeEditOutlined />;
  const saveIcon = <SaveOutlined />;

  const getInfo = async (email: string) => {
    const info = await axios.get(`http://localhost:4000/api/info/${email}`);
    return info.data.info;
  };

  const getFiles = async () => {
    const fileData = await axios.get<fileType>(
      `http://localhost:4000/api/bucket`,
      {
        params: { email: "gabriel.melo@rethink.dev" },
      }
    );
    console.log({ fileData });
    return fileData.data;
  };

  useEffect(() => {
    getFiles();
  }, []);

  const handlerContractStatus = (value: any) => {
    setContractStatus(value);
    axios.post(`http://localhost:4000/api/info/${user.email}`, {
      status: value,
    });
    notify({
      title: "Status do Contrato atualizado!",
      type: "success",
    });
  };

  const { handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    axios.post(`http://localhost:4000/api/info/${user.email}`, {
      college: data.college,
      semester: data.semester,
      workTime: data.workTime,
      transportationVoucher: data.transportationVoucher,
      providedEquipment: data.providedEquipment,
    });
    notify({
      title: "Informações atualizadas!",
      type: "success",
    });
    handleClick();
    setInfo(data);
  };

  useEffect(() => {
    (async () => {
      if (user) {
        setInfo(await getInfo(user.email));
      }
    })();
    return;
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    setIsShown((current) => !current);
  };

  return (
    <div className={styles.contract_outer_container}>
      <div className={styles.breadcrumb}>
        <Breadcrumb
          breadcrumbItems={[
            { title: "Home", link: "/" },
            { title: "Contrato", link: "/contrato" },
          ]}
        />
      </div>
      <div className={styles.contract_title}>Contrato</div>
      <div className={styles.contract_inner_container}>
        <div className={styles.contract_status}>
          <div className={styles.contract_current_status}>
            <div className={styles.contract_current_status_text}>
              <h1>Status do Contrato</h1>
              <p>Envie todos os documentos necessários obter REX's.</p>
            </div>
            <div className={styles.contract_current_status_tag}>
              {user.role === "EMBASSADOR" ? (
                <Dropdown
                  setValue={handlerContractStatus}
                  value={contractStatus}
                  id={""}
                  width={181}
                />
              ) : info?.status === "Pendente" ? (
                <StatusTag type={"pending"} />
              ) : info?.status === "Ativo" ? (
                <StatusTag type={"active"} />
              ) : info?.status === "Encerrado" ? (
                <StatusTag type={"inactive"} />
              ) : (
                ""
              )}
            </div>
          </div>
          <h1>Documentos</h1>
          <div className={styles.cards_container}>
            {/* {getFiles.map((content) =>
              user.role === "EMBASSADOR" ? (
                <DocumentCard
                  key={content.id}
                  id={content.id}
                  title={content.title}
                  type={"embassador"}
                />
              ) : (
                <DocumentCard
                  key={content.id}
                  id={content.id}
                  title={content.title}
                  type={"student"}
                />
              )
            )} */}
            {user.role === "EMBASSADOR" ? "" : <NewDocumentCard />}
          </div>
        </div>
        <div className={styles.contract_info}>
          <h1>Suas Informações</h1>
          {isShown && (
            <div className={styles.contract_info_card}>
              <div className={styles.contract_info_card_content}>
                <p>
                  {" "}
                  <CorporateFare /> Faculdade
                </p>
                <span>{info?.college}</span>
                <p>
                  {" "}
                  <Schedule /> Período
                </p>
                <span>{info?.semester}</span>
                <p>
                  {" "}
                  <BusinessCenter /> Horário de trabalho
                </p>
                <span>{info?.workTime}</span>
                <p>
                  {" "}
                  <DirectionsBus /> Média de gasto com Vale Transporte
                </p>
                <span>{info?.transportationVoucher}</span>
                <p>
                  {" "}
                  <LaptopMac /> Materiais Fornecidos
                </p>
                <span>{info?.providedEquipment}</span>
                {user.role === "EMBASSADOR" ? (
                  <ButtonWithIcon
                    type={"secondary"}
                    size={"block"}
                    text={"Editar"}
                    icon={editIcon}
                    position={"left"}
                    onClick={() => {
                      handleClick();
                    }}
                  />
                ) : (
                  <>
                    <div className={styles.card_content_line} />
                    <small>
                      <InfoOutlined color="disabled" /> Caso haja algum erro ou
                      algo precise ser atualizado, entre em contato com o
                      RH/Embaixador.
                    </small>
                  </>
                )}
              </div>
            </div>
          )}
          {!isShown && (
            <div className={styles.contract_info_card}>
              <form
                className={styles.contract_info_card_content}
                style={{ gap: "5px" }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <p>
                  {" "}
                  <CorporateFare /> Faculdade
                </p>
                <Controller
                  name="college"
                  control={control}
                  defaultValue={info?.college}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="small"
                      value={value}
                      onChange={onChange}
                      variant="standard"
                      sx={{ mb: 1.8 }}
                    />
                  )}
                />
                <p>
                  {" "}
                  <Schedule /> Período
                </p>
                <Controller
                  name="semester"
                  control={control}
                  defaultValue={info?.semester}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      size="small"
                      variant="standard"
                      sx={{ mb: 1.8 }}
                    />
                  )}
                />
                <p>
                  {" "}
                  <BusinessCenter /> Horário de trabalho
                </p>
                <Controller
                  name="workTime"
                  control={control}
                  defaultValue={info?.workTime}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      size="small"
                      variant="standard"
                      sx={{ mb: 1.8 }}
                    />
                  )}
                />

                <p>
                  {" "}
                  <DirectionsBus /> Média de gasto com Vale Transporte
                </p>
                <Controller
                  name="transportationVoucher"
                  control={control}
                  defaultValue={info?.transportationVoucher}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      size="small"
                      variant="standard"
                      sx={{ mb: 1.8 }}
                    />
                  )}
                />

                <p>
                  {" "}
                  <LaptopMac /> Materiais Fornecidos
                </p>
                <Controller
                  name="providedEquipment"
                  control={control}
                  defaultValue={info?.providedEquipment}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      size="small"
                      variant="standard"
                      sx={{ mb: 2.6 }}
                    />
                  )}
                />
                <div className={styles.edit_buttons}>
                  <ButtonWithIcon
                    type={"primary"}
                    size={"small"}
                    width={500}
                    text={"Salvar"}
                    icon={saveIcon}
                    position={"left"}
                    onClick={() => {}}
                  />
                  <ButtonWithIcon
                    type={"outline"}
                    size={"small"}
                    width={500}
                    text={"Cancelar"}
                    icon={<p></p>}
                    position={"left"}
                    onClick={() => {
                      handleClick();
                    }}
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractScreen;
