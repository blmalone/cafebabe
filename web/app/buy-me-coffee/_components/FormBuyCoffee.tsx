import { useCallback } from 'react';
import clsx from 'clsx';
import { parseEther } from 'viem';
import Button from '@/components/Button/Button';
import { useCoffeeShopContract } from '../_contracts/useCoffeeShopContract';
import useFields from '../_hooks/useFields';
import useOnchainCoffeeMemos from '../_hooks/useOnchainCoffeeMemos';
import ContractAlert from './ContractAlert';
import InputText from './InputText';
import Label from './Label';
import TextArea from './TextArea';
import TransactionSteps from './TransactionSteps';
import useSmartContractForms from './useSmartContractForms';

const GAS_COST = 0.0001;
const COFFEE_COUNT = [1, 2, 3, 4];

const initFields = {
  amount: 0,
};

type Fields = {
  amount: number;
};

type FormBuyCoffeeProps = {
  refetchMemos: ReturnType<typeof useOnchainCoffeeMemos>['refetchMemos'];
};

function FormBuyCoffee({ refetchMemos }: FormBuyCoffeeProps) {
  const contract = useCoffeeShopContract();

  const { fields, setField, resetFields } = useFields<Fields>(initFields);

  const reset = useCallback(async () => {
    resetFields();
    await refetchMemos();
  }, [refetchMemos, resetFields]);

  const { disabled, transactionState, resetContractForms, onSubmitTransaction } =
    useSmartContractForms({
      gasFee: parseEther(String(GAS_COST)),
      contract,
      name: 'pay',
      arguments: [fields.amount],
      enableSubmit: fields.amount !== 0,
      reset,
    });

  if (transactionState !== null) {
    return (
      <TransactionSteps
        transactionStep={transactionState}
        amount={fields.amount}
        resetContractForms={resetContractForms}
        gasCost={GAS_COST}
      />
    );
  }

  return (
    <>
      <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left">
        Complete Purchase
      </h2>
      <form onSubmit={onSubmitTransaction} className="w-full">
        <div>
          <div className="mb-5">
            <Label htmlFor="amount">Amount</Label>
            <InputText
              id="amount"
              placeholder="amount to charge (USDC)"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('amount', parseFloat(evt.target.value))}
              disabled={disabled}
              required
            />
          </div>

          <ContractAlert contract={contract} amount={GAS_COST} />

          <Button
            buttonContent={
              <>Buy</>
            }
            type="submit"
            disabled={disabled}
          />
        </div>
      </form>
    </>
  );
}

export default FormBuyCoffee;
