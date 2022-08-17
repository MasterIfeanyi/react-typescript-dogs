import { render, screen, waitFor } from "@testing-library/react"
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { server } from "../mocks/server";
import App from "../App";
import Select from "../components/Select";
import { apiData } from "../data/apiData";
import Dog from "../components/Dog";


test("should correctly set default option", async () => {


    server.use(
        rest.get("*", (req, res, ctx) => {
            return res(ctx.json(apiData))
        })
    )
    
    render(<App />);
    
    const selectInput = await screen.findByRole("option", { name: "Choose a dog breed" })
    
    await waitFor(() => {
        expect((selectInput as HTMLOptionElement).selected).toBe(true);
    })
})


test("options should be five", async () => {
    server.use(
        rest.get("*", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({message: apiData}))
        })
    )

    type componentProps = React.ComponentProps<typeof Select>

    const props: componentProps = { 
        nameOfBreeds: ["bulldog", "african", "pitbull", "beagle"],
        setBreedName: jest.fn(),
        loadByBreed: jest.fn()
    }

    render(<Select {...props}  />);


    const allSelectOptions = await screen.findAllByRole("option")

    await waitFor(() => {
        expect(allSelectOptions.length).toBe(5)
    })
})

test("should change selected option", async () => {
    server.use(
        rest.get("*", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({message: apiData}))
        })
    )
    
    render(<App />);

    userEvent.selectOptions(
        screen.getByRole("combobox"), await screen.findByRole('option', {name: 'bulldog'}),
    )

    const selectInput = await screen.findByRole("option", { name: "bulldog"});

    await waitFor(() => {
        expect((selectInput as HTMLOptionElement).selected).toBe(true)
    })
})

test("select name and display data", async () => {

    server.use(
        rest.get("*", (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({message: apiData}))
        })
    )

    render(<App />)

    userEvent.selectOptions(
        screen.getByRole("combobox"), await screen.findByRole('option', {name: 'african'}),
    )

    const selectInput = await screen.findByRole("option", { name: "african"});

    await waitFor(() => {
        expect((selectInput as HTMLOptionElement).selected).toBe(true)
    })

    type componentProps = React.ComponentProps<typeof Dog>


    const props: componentProps = {
        imagesOfABreed: ["african1", "african2"],
        breedName: "african"
    }

    render(<Dog {...props} />);


    
    // eslint-disable-next-line testing-library/no-debugging-utils
    // await debug();


    const nameEl = await screen.findAllByRole("heading", {name: /african/i})

    await waitFor(() => {
        // expect(nameEl.length).toBeGreaterThan(1);
        expect(nameEl.length).toBe(2);
    })
})