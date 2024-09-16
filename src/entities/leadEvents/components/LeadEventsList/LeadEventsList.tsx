import ButtonOutline from "../../../../components/ButtonOutline";
import AppDate from "../../../../dates/AppDate";
import { LeadEventStructure } from "../../schema";
import "./LeadEventsList.css";

interface LeadEventsListProps {
  leadEvents: LeadEventStructure[];
  onDeleteLeadEvent: (leadEventId: LeadEventStructure["_id"]) => void;
}

const LeadEventsList: React.FC<LeadEventsListProps> = ({
  leadEvents,
  onDeleteLeadEvent,
}) => {
  const deleteLeadEvent = (leadEventId: LeadEventStructure["_id"]) => {
    onDeleteLeadEvent(leadEventId);
  };

  return (
    <ul className="lead-events">
      {leadEvents.map(({ _id, date, description }) => (
        <li className="lead-event" key={_id}>
          {new AppDate(date).format()}: {description}
          <ButtonOutline
            isRound
            hasIcon
            className="lead-event__action"
            onClick={() => deleteLeadEvent(_id)}
          >
            <img
              src="/icons/close.svg"
              alt="Deseleccionar"
              width="24"
              height="24"
            />
          </ButtonOutline>
        </li>
      ))}
    </ul>
  );
};

export default LeadEventsList;
