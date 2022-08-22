import { compile, expression } from 'chai-latte'

export default compile(
  expression(
    ({ it }) => it.can.be(String),
    (stateName: string) => {
      console.log('CREATE STATE', stateName);
    }
  )
);