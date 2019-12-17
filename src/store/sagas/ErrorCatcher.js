import { Alert } from "react-native";

export default function showResponseError(errorResponse, callBack = null) {
  const e = errorResponse.response;

  switch (e.status) {
    case 401:
      Alert.alert(
        "Autenticação requerida.",
        "Sua sessão expirou, faça login novamente"
      );
      break;
    case 403:
      Alert.alert("Acesso negado", "Parece que você não tem permissão");
      break;
    case 500:
      Alert.alert("Erro no sistema", "por favor tenet. mais tarde.");
      break;

    default:
      if (!(typeof e.data === "string")) {
        if (callBack != null) {
          callBack(e.data.errors);
          break;
        } else {
          console.log("ErrorCatcher wihtou callback");
          console.log(e.data);
        }
      } else {
        Alert.alert(e.data);
      }  
      break;
  }
}
