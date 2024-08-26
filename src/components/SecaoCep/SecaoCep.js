function SecaoCep() {

    return (

        <>

            <section className='secaoCep'>

                <form action="" className='secaoCep_formulario'>

                    <fieldset className='secaoCep_formulario_container'>

                        <legend className='secaoCep_formulario_container_titulo'>Endereço</legend>

                        <div className='secaoCep_formulario_container_campo'>

                            <label for="cep" className='secaoCep_formulario_container_campo_titulo'>Cep:</label>
                            <input type="text" id="cep" value="17010-150" className='secaoCep_formulario_container_campo_valor' />

                            <label for="alterarCep" className='iconeEditar'></label>
                            <input type="checkbox" name="" id="alterarCep" className='secaoCep_formulario_container_campo_checkbox' />

                        </div>

                        <label for="logradouro" className='secaoCep_formulario_container_campo_titulo'>Logradouro:</label>
                        <input type="text" id="logradouro" value="Rua Engenheiro Saint Martin" className='secaoCep_formulario_container_campo_valor secaoCep_formulario_container_campo_valor--width' />

                        <label for="bairro" className='secaoCep_formulario_container_campo_titulo'>Bairro:</label>
                        <input type="text" id="bairro" value="Centro" className='secaoCep_formulario_container_campo_valor secaoCep_formulario_container_campo_valor--width' />

                        <div className='secaoCep_formulario_container_campo'>

                            <label for="numero" className='secaoCep_formulario_container_campo_titulo'>Número:</label>
                            <input type="text" id="numero" value="10-12" className='secaoCep_formulario_container_campo_valor' />

                            <label for="alterarCep" className='iconeEditar'></label>
                            <input type="checkbox" name="" id="alterarCep" className='secaoCep_formulario_container_campo_checkbox' />

                        </div>

                    </fieldset>

                </form>
            </section>

        </>
    )
}

export default SecaoCep;