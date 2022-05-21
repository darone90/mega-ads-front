import React, {SyntheticEvent, useState} from "react";
import './AddForm.css';
import {Button} from "../common/Btn";
import {geocoding} from "../../utils/geocoding";
import {Popup} from "./Popup";
import {urlExist} from "../../utils/urlExist";


export const AddForm = () => {

    const [info, setInfo] = useState<string>('');
    const [id, setId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        address: ''
    });

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };

    const save = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            const {lat, lon} = await geocoding(form.address)

            if(lat === 0 && lon === 0) {
                setLoading(false)
                setInfo('Niestety nie udało się określić lokalizacji dla wskazanego adresu')
                return;
            }

            const urlcheck = await urlExist(form.url);
            if(!urlcheck) {
                setLoading(false)
                setInfo('Podany adres url nie istnieje lub nie odpowaida')
                return
            }

            const addRes = await fetch('http://localhost:3030/ad/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                    lat,
                    lon,
                })
            })

            const res = await addRes.json();
            setId(res.id);
            setLoading(false)

        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    const refresh = () => {
        setForm({
            name: '',
            description: '',
            price: 0,
            url: '',
            address: ''
        });
        setId(null);
    }

    if(loading) return <h2>Trwa dodawanie ogłoszenia...</h2>

    if(id) return <><h2>Twoje ogłozenie "{form.name}" zostało poprawnie dodane do serwisu. Zostanie ono wyświetlone po akceptacji administratora. ID towejego ogłoszenia to: {id}</h2><br/>
                    <Button text={'Dodaj następne ogłoszenie'} func={refresh}/>
                  </>

    return (
        <>
        <form action="" className='add-form' onSubmit={save}>
            <h1>Dodwanie ogłoszenia</h1>
            <p>
                <label>
                    Nazwa: <br/>
                    <input type="text" required maxLength={99} name='name' value={form.name} onChange={e => updateForm(e.target.name, e.target.value)}/>
                </label>
            </p>
            <p>
                <label>
                    Opis: <br/>
                    <textarea name="description" maxLength={999} value={form.description} onChange={e => updateForm(e.target.name, e.target.value)}/>
                </label>
            </p>
            <p>
                <label>
                    Cena: <br/>
                    <input type="number" name="price" required maxLength={99} value={form.price} onChange={e => updateForm(e.target.name, Number(e.target.value))}/><br/>
                    <small>Pozostaw zero w polu aby nie wyświetlac ceny</small>
                </label>
            </p>
            <p>
                <label>
                    Adres URL: <br/>
                    <input type="url" name="url" maxLength={99} value={form.url} onChange={e => updateForm(e.target.name, e.target.value)}/>
                </label>
            </p>
            <p>
                <label>
                    Adres fizyczny na mapie: <br/>
                    <input type="text" name="address" required value={form.address} onChange={e => updateForm(e.target.name, e.target.value)}/>
                    <small>Podaj adres w formacie Miasto, ulica numer: Nie używaj przedrostka Ul. przed nazwą ulic!</small>
                </label>
            </p>
            <Button text={'Zapisz'}/>
        </form>
            {info ? <Popup text={info}/> : null}
        </>
    )
}