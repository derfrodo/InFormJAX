import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { queryStatistics } from "./gql/queryStatistics";
import styles from "./Statistics.module.css"

function InPercent({ value, total }: { value: number | null | undefined, total: number | null | undefined }) {
    return typeof value === "number" && typeof total === "number" && total !== 0 ?
        <>{Intl.NumberFormat(navigator.language || navigator.languages, {
            maximumFractionDigits: 2,
            style: 'percent',
            unit: "percent"
        }).format(value / total)}</> :
        null
}

export function Statistics() {
    const navigate = useNavigate();
    const { data } = useQuery(queryStatistics);
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                navigate("/", { replace: true });
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [navigate]);

    return (
        <main >
            <div className={styles.statisticsContainer}>
                <div className={styles.flexContainer}>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Won</th>
                                    <th>Lost</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data?.statistics?.won} (<InPercent value={data?.statistics?.won} total={data?.statistics?.total} />)</td>
                                    <td>{data?.statistics?.loose} (<InPercent value={data?.statistics?.loose} total={data?.statistics?.total} />)</td>
                                    <td>{data?.statistics?.total}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </main>
    );
}
