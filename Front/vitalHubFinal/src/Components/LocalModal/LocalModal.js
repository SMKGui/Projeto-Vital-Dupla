import { Modal } from "react-native"
import { Title } from "../Title/Style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/Style"
import { IdadeEmail, ImagemProntuario, TextoProntuario } from "../ProntuarioModal/Style"
import { ButtonModal, ButtonSecondary } from "../Button/Style"
import { ModalContent, PatientModal } from "../CancelationModal/Style"

export const LocalModal = ({
    visible,
    navigation,
    setShowModalLocal,
    roleUsuario,
    consulta,
    ...rest
}) => {

    function handlePress(rota) {

        setShowModalLocal(false)

        navigation.navigate(rota, { clinicaId: consulta.medicoClinica.clinicaId })

    }

    return (
        <>
            {consulta != null ?
                <Modal
                    {...rest}
                    visible={visible}
                    transparent={true}
                    animationType="fade"
                >
                    {/* container */}
                    <PatientModal>
                        {/* content */}
                        <ModalContent>
                            <ImagemProntuario
                                source={{ uri: consulta.medicoClinica.medico.idNavigation.foto}}
                            />

                            <Title>Dr. {consulta.medicoClinica.medico.idNavigation.nome}</Title>

                            <IdadeEmail>
                                <TextoProntuario>Clínico Geral</TextoProntuario>
                                <TextoProntuario>CRM-{consulta.medicoClinica.medico.crm}</TextoProntuario>
                            </IdadeEmail>

                            {/* button */}
                            <ButtonModal onPress={() => handlePress("Local")}>

                                <ButtonTitle>Ver Local da Consulta</ButtonTitle>

                            </ButtonModal>

                            {/* button cancel */}
                            <ButtonSecondary onPress={() => setShowModalLocal(false)}>
                                <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                            </ButtonSecondary>

                        </ModalContent>
                    </PatientModal>
                </Modal>
                : 
                <>
                </>
            } 
            
        </>
    )
}