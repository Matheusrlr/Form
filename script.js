$(document).ready(function(){
      
    $("#phone").mask("99-999999999");
    
    $("#yes").change(function(){
        $("#redesociais").css("visibility", "visible");
    });

    $("#no").change(function(){
        $("#redesociais").css("visibility", "hidden");
    });

    $("form").submit(function(e){
        let nome = $("#name").val()
        let phone = $("#phone").val()
        let conheceu = $("info").val()
        let redesocial = $('input[name=redesociais]:checked').val()
        let rede = []

        if( nome.split(' ').length < 2 ){
            $("#name").css("border", "1px solid red");
            $("#name").prev().css("color", "red");
            $("#warn").append(" <div>*Insira nome e sobrenome</div> ")
        }else if( phone.length < 11  ){
            $("#phone").css("border", "1px solid red");
            $("#phone").prev().css("color", "red");
            $("#warn").append(" <div>*Formato de telefone incorreto</div> ")
        }else{
            if( redesocial == 'yes' ){
                if ( $('#face').is(":checked") ) {
                    rede.push($('#face').val())
                }
                if ( $('#linke').is(":checked") ) {
                    rede.push($('#linke').val())
                }
                if ( $('#insta').is(":checked") ) {
                    rede.push($('#insta').val())
                }
            }
            
            $.ajax({
                url: "localhost:8080",
                method: "POST",
                data: {
                    nome: nome,
                    telefone: phone,
                    onde_conheceu: conheceu,
                    redes_sociais: rede
                },
                success: function(result){
                    $("#enviar").attr("disabled", true);
                },
                error: function (request, status, error) {
                    alert("Erro ao fazer requisilção.");
                }
            });
        }
        e.preventDefault();
    });
});