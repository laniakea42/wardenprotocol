import useRequestSignature from "@/hooks/useRequestSignature";
import useRequestTransactionSignature from "@/hooks/useRequestTransactionSignature";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import SignatureRequestDialog from "./signature-request-dialog";
import SignTransactionRequestDialog from "./sign-transaction-request-dialog";
import InstallMetaMaskSnapButton from "./install-metamask-snap-button";

export function MetaMaskRequests() {
  const {
    state: reqSignatureState,
    error: reqSignatureError,
    requestSignature,
    reset: resetReqSignature,
  } = useRequestSignature();
  const {
    state: reqTxSignatureState,
    error: reqTxSignatureError,
    requestTransactionSignature,
    reset: resetReqTxSignature,
  } = useRequestTransactionSignature();

  return (
    <Popover.Root modal={true}>
      <Popover.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Update dimensions"
          className={cn(
            "h-16 w-16 rounded-none border-l hover:bg-muted hover:border-b-accent hover:border-b-2"
          )}
        >
          <span>M</span>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-card border border-t-0 w-96 rounded-b-lg max-h-[calc(100vh-64px)] overflow-scroll no-scrollbar">
          <div className="p-4 flex flex-col space-y-4">
            <SignatureRequestDialog
              state={reqSignatureState}
              error={reqSignatureError}
              reset={resetReqSignature}
            />
            <SignTransactionRequestDialog
              state={reqTxSignatureState}
              error={reqTxSignatureError}
              reset={resetReqTxSignature}
            />
            <InstallMetaMaskSnapButton />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
