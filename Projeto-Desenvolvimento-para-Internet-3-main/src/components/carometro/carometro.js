import React, { useState, useEffect } from "react";
import axios from "axios";
//import './Carometro.css';

const Carometro = () => {
    const urlApiAlunos = "http://localhost:5035/api/controller"
    const [data, setData] = useState([])
    const [dataAtualizada, setDataAtualizada] = useState(true)
    const avatar = ['adventurer', 'micah', 'bottts', 'adventurer-neutral', 'pixel-art']

    function ramdomAvatar() {
        let tamanho = avatar.length
        let av = Math.floor(Math.random() * tamanho)
        let rd = avatar[av]
        return rd
    }

    function geraStringAleatoria(tamanho) {
        let stringAleatoria = '';
        let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }

    let imgURL = () => `https://avatars.dicebear.com/api/${ramdomAvatar()}/${geraStringAleatoria(8)}.svg`

    const dataFromAPI = async () => {
        await axios(urlApiAlunos)
            .then(resp => {
                setDataAtualizada(true)
                setData(resp.data)
            })
            .catch(error => {
                console.error(error)
            })
    }


    useEffect(() => {
        if (dataAtualizada) {
            dataFromAPI()
            setDataAtualizada(false)
        }
    }, [dataAtualizada])

    return (
        
        <div className="text-center duration-75 rounded-lg">
        <div className="flex flex-wrap  gap-5 w-screen items-center justify-between py-10 px-40 min-w-[100px]">
            {data.map((datas) => {
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