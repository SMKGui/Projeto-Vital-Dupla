import { ScrollView } from "react-native"
import { TextAge } from "../../Components/AppointmentCard/Style"
import { ButtonPerfil } from "../../Components/Button/Style"
import { Container, ContainerLeftPaddingLeft } from "../../Components/Container/Style"
import { ContainerRow } from "../../Components/ContainerRow/Style"
import { FotoPerfil } from "../../Components/FotoPerfil/Style"
import { ProntuarioInputMaior, ProntuarioInputMenor_NoMargin } from "../../Components/Input/Style"
import { SubTitle_NotMargin } from "../../Components/SubTitle/Style"
import { Title, TitleProntuario } from "../../Components/Title/Style"
import { ButtonTitle } from "../../Components/ButtonTitle/Style"
import { useEffect, useState } from "react"
import { idadeCalc } from "../../Utils/Auth"
import { ContentAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import api from "../../Service/Service"

export const Prontuario = ({ navigation, route }) => {

    const [consulta, setConsulta] = useState(null)
    const [editing, setEditing] = useState(false)
    const [attConsulta, setAttConsulta] = useState({})

    function EditarFunction() {
        setEditing(true)
    }

    function CancelFunction() {
        setEditing(false)
    }

    async function SalvarFunction() {
        if (attConsulta) {
            await api.put("/Consultas/Prontuario", {
                id: route.params.consulta.id,
                medicamento: attConsulta.prescricao,
                descricao: attConsulta.descricao,
                diagnostico: attConsulta.diagnostico
            }).then(() => {
                setEditing(false)
                setAttConsulta({})
            }).catch((error) => {
                console.log(error);
            })
        }

    }
    useEffect(() => {
        setConsulta(route.params.consulta)
    }, [route])

    return (
        <ScrollView>
            {consulta != null ?
                <Container>

                    <FotoPerfil
                        source={{ uri: consulta.paciente.idNavigation.foto }}
                    />

                    <Title>{consulta.paciente.idNavigation.nome}</Title>

                    <ContainerRow>
                        <TextAge>{idadeCalc(consulta.paciente.dataNascimento)} anos</TextAge>
                        <SubTitle_NotMargin>{consulta.paciente.idNavigation.email}</SubTitle_NotMargin>
                    </ContainerRow>

                    <ContainerLeftPaddingLeft>

                        <TitleProntuario>Descrição da consulta</TitleProntuario>

                        <ProntuarioInputMaior
                            placeholder="Não Informado"
                            value={consulta.descricao}
                            editable={editing}
                            onChangeText={(txt) => setAttConsulta({ ...attConsulta, descricao: txt })
                            }
                        />
                    </ContainerLeftPaddingLeft>

                    <ContainerLeftPaddingLeft>

                        <TitleProntuario>Diagnóstico do paciente</TitleProntuario>

                        <ProntuarioInputMenor_NoMargin
                            placeholder="Não Informado"
                            value={consulta.diagnostico}
                            editable={editing}
                            onChangeText={(txt) => setAttConsulta({ ...attConsulta, diagnostico: txt })
                            }
                        />
                    </ContainerLeftPaddingLeft>

                    <ContainerLeftPaddingLeft>

                        <TitleProntuario>Prescrição médica</TitleProntuario>

                        <ProntuarioInputMaior
                            placeholder="Não Informado"
                            value={consulta.receita.medicamento}
                            editable={editing}
                            onChangeText={(txt) => setAttConsulta({ ...attConsulta, prescricao: txt })
                            }
                        />
                    </ContainerLeftPaddingLeft>

                    <ButtonPerfil onPress={() => SalvarFunction()} disabled={!editing} color={!editing}>
                        <ButtonTitle>Salvar</ButtonTitle>
                    </ButtonPerfil>

                    {editing ?
                        <>
                            <ButtonPerfil onPress={() => CancelFunction()}>
                                <ButtonTitle>Cancelar Edição</ButtonTitle>
                            </ButtonPerfil>
                        </>

                        :
                        <>
                            <ButtonPerfil onPress={() => EditarFunction()}>
                                <ButtonTitle>Editar</ButtonTitle>
                            </ButtonPerfil>

                            <ContentAccount onPress={() => navigation.navigate("Main")}>
                                <TextAccountLink>Cancelar</TextAccountLink>
                            </ContentAccount>
                        </>

                    }
                </Container>
                :
                <></>
            }

        </ScrollView>
    )
}