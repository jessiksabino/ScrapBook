import * as E from './styles'

interface ModalProps{
    handleDelete: () => void;
    handleVisible: () => void;
    texto: string;
}

export default function Modal({handleDelete, handleVisible, texto}: ModalProps){
    return(
            <E.BackModal>
                <E.Modal>

                    <div>
                        <h2>{texto}</h2>
                    </div>
                    <div>
                        <button onClick={handleDelete} className="yes">Apagar</button>
                        <button onClick={handleVisible} className="no">Cancelar</button>
                    </div>
                </E.Modal>
            </E.BackModal>
    )
}