/* ------------------------------------
*  Generated by chai-latte
*  Please do not edit this file directly
*  Instead, edit the file './index'
* ------------------------------------
*/

import builder from './index';

type Expressions = typeof builder.__expressions;
type ExpressionCallback<Idx extends number> = Expressions[Idx]['callback'];
type Arg<Idx extends number, ArgIndex extends number> = Parameters<ExpressionCallback<Idx>>[ArgIndex];
type Return<Idx extends number> = ReturnType<ExpressionCallback<Idx>>;

type Root = {}
  & { it: { starts: { as: { (stateName: Arg<0, 0>) : Return<0>; }; }; }; }
  & { it: { can: { be: { (stateName: Arg<1, 0>) : Return<1>; }; }; }; }
  & { given: { (state: Arg<2, 0>) : { when: { (event: Arg<2, 1>) : { then: { it: { becomes: { (nextState: Arg<2, 2>) : Return<2>; }; }; } }; } }; }; };

export default builder as unknown as Root;