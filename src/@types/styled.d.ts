//a extensão d.ts indica que aqui dentro só pode ter código de definição do ts, somente tipagem. Tudod isso é somente para que o ts consiga dar opções do próprio styled-components para completar o código em outros arquivos.

import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme;


declare module 'styled-components'{
  export interface DefaultTheme extends ThemeType{}
}