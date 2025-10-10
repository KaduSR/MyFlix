import { useSearchParams } from "react-router-dom";

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    return (
        <div>
            <h2>Resultados para: {query}</h2>
            {/* Aqui você pode adicionar a lógica para buscar e exibir os resultados com base na query */}
        </div>
    );

}
 export default Search;
