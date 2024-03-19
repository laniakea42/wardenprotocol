package intent

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/x/intent/keeper"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// this line is used by starport scaffolding # genesis/module/init

	if err := k.ImportState(ctx, genState); err != nil {
		panic(fmt.Errorf("importing genesis state: %w", err))
	}

	err := k.SetParams(ctx, genState.Params)
	if err != nil {
		panic(err)
	}
}

// ExportGenesis returns the module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	var err error
	genesis.Kv, err = k.ExportState(ctx)
	if err != nil {
		panic(fmt.Errorf("exporting genesis state: %w", err))
	}

	genesis.Params = k.GetParams(ctx)

	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
