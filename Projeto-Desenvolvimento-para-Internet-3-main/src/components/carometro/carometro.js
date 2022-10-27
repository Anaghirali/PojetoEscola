import React, { useState, useEffect } from "react";
import axios from "axios";
//import './Carometro.css';

const Carometro = () => {
    const urlApiAlunos = "http://localhost:5035/api/controller"
    const urlAPICursos = "http://localhost:5035/api/controller/cursos"

   
    const [dataAtualizada, setDataAtualizada] = useState(true)
    const initialState = {
        aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
        curso: { id: 0, codCurso: "", nomeCurso: "", periodo: "" },
        listaAlunos: [],
        listaCursos: [],
    }

    
    const [listaAlunos, setListaAlunos] = useState(initialState.listaAlunos);
    const [curso, setCurso] = useState(initialState.curso);

    const [vetCurso, setVetCurso] = useState([])
    const [vetAluno, setVetAluno] = useState([])

    const [dadosCurso, setDadosCurso] = useState({
        curso: { id: 0, codCurso: "", nomeCurso: "", periodo: "" },
    })
    const [dadosAluno, setDadosAlunos] = useState({
        aluno: { id: 0, ra: '', nome: '', codCurso: 0 }
    })

    const avatar = ['adventurer']

    function ramdomAvatar() {
        let t = avatar.length
        let av = Math.floor(Math.random() * t)
        let random = avatar[av]
        return random
    }

    function randomString(t) {
       return Math.random().toString(36).substring(1, 9)
    }

    let imgURL = () => `https://avatars.dicebear.com/api/${ramdomAvatar()}/${randomString(8)}.svg`

    const dataFromAPI = async () => {

            await axios(urlApiAlunos)
            .then(resp => {
               setDataAtualizada(true)
               setVetCurso(resp.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const dataFromAPI2 = async (codCurso) => {

        return await axios(urlApiAlunos)
            .then(resp => {
                const DataCursos = resp.data
                setDataAtualizada(true)
                return DataCursos.filter(
                    (aluno) => aluno.codCurso === codCurso
                );
            })
            .catch(error => {
                console.error(error)
            })
    }

    const updateAlunos = async (e) => {
        const codCurso = e.target.value;
        if (e.target.value === "") {
            setVetAluno(dadosAluno.aluno);
            setDadosCurso(dadosCurso.curso);
        }
        dadosCurso.codCurso = Number(codCurso)
        const listaDeAlunos = await dataFromAPI2(dadosCurso.codCurso)
        setVetAluno(listaDeAlunos)
        setDadosCurso(curso)
    }


    useEffect(() => {
        if (dataAtualizada) {
            dataFromAPI()
            setDataAtualizada(false)
        }
    }, [dataAtualizada])

    return (

        
        <div className="text-center duration-75 rounded-lg">
            <div className="flex items-center justify-between pl-10 py-10">
                <select name="codCurso" onChange={e => { updateAlunos(e) }}>
                    <option name="initialValue" value="" selected>Escolha um Curso</option>
                    {vetCurso.map(
                        (curso) =>
                            <option
                                key={curso.id}
                                name="codCurso"
                                value={curso.codCurso}
                            >
                                {curso.nomeCurso}
                                -
                                {curso.periodo}
                            </option>

                    )}
                </select>
            </div>
        <div className="flex flex-wrap  gap-5 w-screen items-center justify-between py-10 px-40 min-w-[100px]">
            {vetAluno.map((datas) => {
                return (
                        <div key={datas.id} className="flex flex-wrap p-5 shadow-2xl shadow-blue-700 w-[200px] h-[350px]">
                            <div className="">
                            <div className="">
                                <div className="w-9/12 items-center self-center place-items-center">
                                    <img src={imgURL()} alt={datas.nome} className="" loading="lazy" />
                                </div>
                            </div>

                            <div className="flex flex-col flex-wrap w-[180px] pt-5 gap-3 text-left">
                                <span className="text-teal-500 font-medium">{datas.nome}</span>
                                <span className="font-medium">RA: {datas.ra}</span>
                                <span className="">Curso: {datas.ra}</span>
                                
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
)
}

export default Carometro