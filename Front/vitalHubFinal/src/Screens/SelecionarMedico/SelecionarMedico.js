import { useEffect, useState } from "react"
import { Button } from "../../Components/Button/Style"
import { ButtonTitle } from "../../Components/ButtonTitle/Style"
import { Container, ContainerClinicas, ContainerSpace } from "../../Components/Container/Style"
import { ContentAccount, TextAccountLink } from "../../Components/ContentAccount/Style"
import { Title } from "../../Components/Title/Style"
import api from "../../Service/Service"
import { ListComponent } from "../../Components/List/List"
import { MedicComponent } from "../../Components/MedicComponent/MedicComponent"

export const SelecionarMedico = ({ navigation, route }) => {
    const [medicoLista, setMedicoLista] = useState([])
    const [selected, setSelected] = useState("")


    const Continuar = () => {
        navigation.replace("SelecionarData", {
            agendamento:{
                ...route.params.agendamento,
                ...selected
            }
        })
    }
    const Voltar = () => {
        navigation.navigate("SelecionarClinica")
    }

    async function ListarMedicos() {
        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
            .then(response => {
                setMedicoLista(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        ListarMedicos();
    }, [])
    return (
        <Container>
            <ContainerSpace>

                <Title>Selecionar Médico</Title>

                <ContainerClinicas>
                    <ListComponent
                        data={medicoLista}
                        renderItem={({ item }) => <MedicComponent
                            selected={item.idNavigation.nome === selected.medicoLabel}
                            name={item.idNavigation.nome}
                            specify={item.especialidade.especialidade1}
                            onPress={() => {
                                setSelected({
                                    medicoClinicaId: item.id,
                                    medicoLabel: item.idNavigation.nome,
                                    medicoEspecialidade: item.especialidade.especialidade1
                                })
                            }}
                        />}
                        keyExtractor={(item) => {
                            item.id;
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </ContainerClinicas>

                <Button onPress={() => Continuar()}>
                    <ButtonTitle>Continuar</ButtonTitle>
                </Button>

                <ContentAccount onPress={() => Voltar()}>
                    <TextAccountLink>Cancelar</TextAccountLink>
                </ContentAccount>

            </ContainerSpace>
        </Container>
    )
}