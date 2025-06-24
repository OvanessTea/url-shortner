import { Analytics } from "../../types/analytics.type";
import styles from './AnalyticsCard.module.scss';

export const AnalyticsCard = ({ data }: { data: Analytics }) => {
    return (
        <div className={styles.analytics}>
            <h4>Analytics</h4>
            <p><strong>Total Clicks:</strong> {data.clickCount}</p>
            {data.recentIps.length > 0 && (
                <div>
                    <strong>Recent IP Addresses:</strong>
                    <ul>
                        {data.recentIps.map((ip, index) => (
                            <li key={index}>{ip}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}