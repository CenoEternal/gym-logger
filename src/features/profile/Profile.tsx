import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SetGender, SetHeight, SetWeight } from "./ProfileSlice";

const Profile = () => {
    const dispatch = useAppDispatch();
    const { weight, height, gender } = useAppSelector((state) => state.profile);
    const kg = Number(weight);
    const cm = Number(height);
const bmi = kg > 0 && cm > 0 ? kg / (cm / 100) ** 2 : null;

    return (
        <div>
            <h2>Profile</h2>

            <label>
                Gewicht (kg)
                <input
                    className="c-input"
                    type="text"
                    value={weight}
                    onChange={(e) => dispatch(SetWeight(e.target.value))}
                />
            </label>

            <label>
                Lengte (cm)
                <input
                    className="c-input"
                    type="text"
                    value={height}
                    onChange={(e) => dispatch(SetHeight(e.target.value))}
                />
            </label>

            <label>
                Geslacht
                <select
                    className="c-input"
                    value={gender}
                    onChange={(e) => dispatch(SetGender(e.target.value))}
                >
                    <option value="">Kies...</option>
                    <option value="male">Man</option>
                    <option value="female">Vrouw</option>
                    <option value="other">Anders</option>
                    <option value="ligma">ligma</option>
                </select>
            </label>
        
        {bmi !== null && (
            <div className="c-stat">
                <p className="c-stat__label">BMI</p>
                <p className="c-stat__value">{bmi.toFixed(1)}</p>
            </div>
        )}
    </div>
    );
};

export default Profile;
