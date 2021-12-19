import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "../../../../../themes";
import TableComponent from '../Table';
// load json file
import tableData from '../testdata.json';


const MeTableComponent = () => {
    return (
        <div>
            <ThemeProvider theme={Themes.default}>
                <CssBaseline />
                <TableComponent title="test-one" data={tableData} />
            </ThemeProvider>
        </div>
    );
}

// it('redner without crashing', () => {
//     render(<MeTableComponent />);
// });

it('redner without crashing', async () => {
    render(<MeTableComponent />);
    const paragrahElement = screen.getByText(/test-one/);
    expect(paragrahElement).toBeInTheDocument();
});
