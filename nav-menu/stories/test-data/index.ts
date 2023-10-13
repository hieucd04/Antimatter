import {NavMenuProps} from "@miniskylab/antimatter-nav-menu";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";

export const TestData: ITestData = {
    selectedUrl: "/dolor-sit-amet",
    categories: [
        {
            label: "Lorem ipsum",
            menuItems: [
                {
                    icon: DefaultIconSet.Statistics,
                    label: "Dolor sit amet",
                    url: "/dolor-sit-amet"
                },
                {
                    icon: DefaultIconSet.Health,
                    label: "Consectetur",
                    url: "/consectetur"
                }
            ]
        },
        {
            label: "Sodales",
            menuItems: [
                {
                    icon: DefaultIconSet.PriceTag,
                    label: "Imperdiet",
                    url: "/imperdiet"
                },
                {
                    icon: DefaultIconSet.Eye,
                    label: "Dignissim",
                    url: "/dignissim"
                },
                {
                    icon: DefaultIconSet.Apple,
                    label: "Condimentum",
                    url: "/condimentum"
                },
                {
                    icon: DefaultIconSet.Droplet,
                    label: "Pellentesque",
                    url: "/pellentesque"
                }
            ]
        },
        {
            label: "Viverra",
            menuItems: [
                {
                    icon: DefaultIconSet.Medal,
                    label: "Vulputate",
                    url: "/vulputate"
                },
                {
                    icon: DefaultIconSet.Money,
                    label: "Placerat",
                    url: "/placerat"
                },
                {
                    icon: DefaultIconSet.Rocket,
                    label: "Pharetra",
                    url: "/pharetra"
                }
            ]
        }
    ]
};

type ITestData = {
    selectedUrl: string;
    categories: NavMenuProps["categories"];
}